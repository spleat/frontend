import { h, Component } from 'preact';

import Card from 'preact-material-components/Card';
import Menu from './../../components/Menu';
import LayoutGrid from 'preact-material-components/LayoutGrid';

export default class Home extends Component {
  render() {
    return (
      <div>
        <LayoutGrid>
          <LayoutGrid.Inner>
            <LayoutGrid.Cell cols="2" />
            <LayoutGrid.Cell cols="4">
              <Card>
                <Card.Title>Menu</Card.Title>
                <Menu />
              </Card>
            </LayoutGrid.Cell>
            <LayoutGrid.Cell cols="4">
              <Card>
                <Card.Title>Order dishes</Card.Title>
                <Menu readOnly />
              </Card>
            </LayoutGrid.Cell>
            <LayoutGrid.Cell cols="2" />
          </LayoutGrid.Inner>
        </LayoutGrid>
      </div>
    );
  }
}
