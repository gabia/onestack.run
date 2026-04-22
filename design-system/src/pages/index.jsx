import Introduction from './Introduction.jsx';
import Principles from './Principles.jsx';
import Colors from './Colors.jsx';
import Typography from './Typography.jsx';
import SpacingPage from './Spacing.jsx';
import Icons from './Icons.jsx';
import ButtonPage from './Button.jsx';
import LinkButtonPage from './LinkButton.jsx';
import InputPage from './Input.jsx';
import TextareaPage from './Textarea.jsx';
import SelectPage from './Select.jsx';
import TabPage from './Tabs.jsx';
import RadiusPage from './Radius.jsx';
import BadgePage from './Badge.jsx';
import CardPage from './Card.jsx';
import TablePage from './Table.jsx';
import DashboardPattern from './Dashboard.jsx';
import EmptyState from './EmptyState.jsx';
import ContainerPage from './Container.jsx';

const OS_PAGES = {
  introduction: Introduction,
  principles: Principles,
  colors: Colors,
  typography: Typography,
  spacing: SpacingPage,
  icons: Icons,
  button: ButtonPage,
  'link-button': LinkButtonPage,
  input: InputPage,
  textarea: TextareaPage,
  select: SelectPage,
  tabs: TabPage,
  radius: RadiusPage,
  badge: BadgePage,
  card: CardPage,
  table: TablePage,
  dashboard: DashboardPattern,
  'empty-state': EmptyState,
  container: ContainerPage,
};

export default OS_PAGES;
