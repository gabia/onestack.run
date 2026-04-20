/**
 * data-plid 속성 주입 스크립트
 * 
 * JSX 요소에 data-plid 속성을 추가하여 소스 코드 위치를 추적 가능하게 함.
 * 영역 선택 편집 기능에서 사용됨.
 */

import fs from 'node:fs/promises'
import path from 'node:path'

interface InjectOptions {
  filePath: string
  code: string
}

/**
 * JSX 코드에 data-plid 속성 주입
 * 
 * @param options - 파일 경로와 코드
 * @returns data-plid가 주입된 코드
 */
export function injectPlid(options: InjectOptions): string {
  const { filePath, code } = options
  
  // 상대 경로로 변환 (components/ 기준)
  const relativePath = filePath.includes('components/') 
    ? filePath.split('components/')[1] 
    : path.basename(filePath)

  const lines = code.split('\n')
  const result: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lineNumber = i + 1

    // JSX 태그 시작 패턴 매칭
    // <div, <button, <input 등 (self-closing 포함)
    const jsxTagPattern = /<([a-z][a-zA-Z0-9]*|[A-Z][a-zA-Z0-9]*)(\s|>|\/)/g
    
    let modifiedLine = line
    let match: RegExpExecArray | null
    let offset = 0

    // 한 라인에 여러 태그가 있을 수 있음
    const tempLine = line
    jsxTagPattern.lastIndex = 0
    
    while ((match = jsxTagPattern.exec(tempLine)) !== null) {
      const tagStart = match.index
      const tagName = match[1]
      const afterTag = match[2]
      
      // 이미 data-plid가 있으면 스킵
      const restOfLine = tempLine.slice(tagStart)
      if (restOfLine.includes('data-plid')) {
        continue
      }

      // 닫는 태그 스킵 (</div>)
      if (tagStart > 0 && tempLine[tagStart - 1] === '/') {
        continue
      }

      // 주석 내부 스킵
      if (isInsideComment(tempLine, tagStart)) {
        continue
      }

      // 문자열 내부 스킵
      if (isInsideString(tempLine, tagStart)) {
        continue
      }

      const plid = `${relativePath}:${lineNumber}`
      const insertPosition = tagStart + tagName.length + 1 + offset // +1 for '<'
      
      if (afterTag === ' ') {
        // 속성이 있는 경우: <div className=...> → <div data-plid="..." className=...>
        modifiedLine = 
          modifiedLine.slice(0, insertPosition) + 
          ` data-plid="${plid}" ` + 
          modifiedLine.slice(insertPosition)
        offset += ` data-plid="${plid}" `.length
      } else if (afterTag === '>') {
        // 속성이 없는 경우: <div> → <div data-plid="...">
        modifiedLine = 
          modifiedLine.slice(0, insertPosition) + 
          ` data-plid="${plid}"` + 
          modifiedLine.slice(insertPosition)
        offset += ` data-plid="${plid}"`.length
      } else if (afterTag === '/') {
        // Self-closing: <input /> → <input data-plid="..." />
        modifiedLine = 
          modifiedLine.slice(0, insertPosition) + 
          ` data-plid="${plid}"` + 
          modifiedLine.slice(insertPosition)
        offset += ` data-plid="${plid}"`.length
      }
    }

    result.push(modifiedLine)
  }

  return result.join('\n')
}

/**
 * 주어진 위치가 주석 내부인지 확인
 */
function isInsideComment(line: string, position: number): boolean {
  const beforePosition = line.slice(0, position)
  
  // 단일 행 주석 //
  const singleLineComment = beforePosition.lastIndexOf('//')
  if (singleLineComment !== -1) {
    return true
  }

  // JSX 주석 {/* ... */}
  const jsxCommentStart = beforePosition.lastIndexOf('{/*')
  const jsxCommentEnd = beforePosition.lastIndexOf('*/}')
  if (jsxCommentStart !== -1 && (jsxCommentEnd === -1 || jsxCommentStart > jsxCommentEnd)) {
    return true
  }

  return false
}

/**
 * 주어진 위치가 문자열 내부인지 확인
 */
function isInsideString(line: string, position: number): boolean {
  const beforePosition = line.slice(0, position)
  
  // 간단한 문자열 검사 (완벽하지 않지만 MVP에 충분)
  const singleQuotes = (beforePosition.match(/'/g) || []).length
  const doubleQuotes = (beforePosition.match(/"/g) || []).length
  const backticks = (beforePosition.match(/`/g) || []).length

  return (singleQuotes % 2 !== 0) || (doubleQuotes % 2 !== 0) || (backticks % 2 !== 0)
}

/**
 * 파일에서 data-plid 주입 처리
 */
export async function processFile(inputPath: string, outputPath?: string): Promise<void> {
  const code = await fs.readFile(inputPath, 'utf-8')
  const result = injectPlid({ filePath: inputPath, code })
  
  const finalOutputPath = outputPath || inputPath
  await fs.writeFile(finalOutputPath, result, 'utf-8')
  
  console.log(`Processed: ${inputPath} → ${finalOutputPath}`)
}

// CLI 인터페이스
async function main() {
  const args = process.argv.slice(2)
  
  if (args.length === 0) {
    console.error('Usage: npx tsx scripts/inject-plid.ts <inputFile> [outputFile]')
    process.exit(1)
  }

  const inputPath = args[0]
  const outputPath = args[1]

  try {
    await processFile(inputPath, outputPath)
  } catch (error) {
    console.error('Failed to process file:', error)
    process.exit(1)
  }
}

main()
