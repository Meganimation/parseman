import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Table } from './Table';

export default {
  title: 'Table/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

const tableContent = (
  <tbody>
      <tr>

          <td>
              <span>3213456785</span>
          </td>
          <td>
              <span>$31.43</span>
          </td>
          <td>
              <span>Pending</span>
          </td>
          <td>
              <span>Dave</span>
          </td>
      </tr>
      <tr>

          <td>
              <span>9874563245</span>
          </td>
          <td>
              <span>$12.99</span>
          </td>
          <td>
              <span>Delivered</span>
          </td>
          <td>
              <span>Cathy</span>
          </td>
      </tr>
      <tr>

          <td>
              <span>3456781234</span>
          </td>
          <td>
              <span>$320.00</span>
          </td>
          <td>
              <span>In Progress</span>
          </td>
          <td>
              <span>Alexander</span>
          </td>
      </tr>
  </tbody>
)

const Template: ComponentStory<typeof Table> = (args) => <Table tableContent={tableContent} headers={['b','c','d','e']} minCellWidth={120}/>;

export const Primary = Template.bind({});
Primary.args = {
  
};
