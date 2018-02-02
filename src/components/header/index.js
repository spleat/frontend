import { h, Component } from 'preact';
import { route } from 'preact-router';
import Toolbar from 'preact-material-components/Toolbar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import Dialog from 'preact-material-components/Dialog';
import Switch from 'preact-material-components/Switch';
import { Link } from 'preact-router/match';

export default class Header extends Component {
  openSettings = () => this.dialog.MDComponent.show();

  dialogRef = dialog => (this.dialog = dialog);

  toggleDarkTheme = () => {
    this.setState(
      {
        darkThemeEnabled: !this.state.darkThemeEnabled
      },
      () => {
        if (this.state.darkThemeEnabled) {
          document.body.classList.add('mdc-theme--dark');
        }
        else {
          document.body.classList.remove('mdc-theme--dark');
        }
      }
    );
  }

  render() {
    return (
      <div>
        <Toolbar className="toolbar">
          <Toolbar.Row>
            <Toolbar.Section align-start>
              <Toolbar.Title>
                <Link href="/">
                  Spleat
                </Link>
              </Toolbar.Title>
            </Toolbar.Section>
            <Toolbar.Section align-end onClick={this.openSettings}>
              <Toolbar.Icon>settings</Toolbar.Icon>
            </Toolbar.Section>
          </Toolbar.Row>
        </Toolbar>
        <Dialog ref={this.dialogRef}>
          <Dialog.Header>Settings</Dialog.Header>
          <Dialog.Body>
            <div>
              Enable dark theme <Switch onClick={this.toggleDarkTheme} />
            </div>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.FooterButton accept>okay</Dialog.FooterButton>
          </Dialog.Footer>
        </Dialog>
      </div>
    );
  }
}
