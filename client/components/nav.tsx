import React from 'react';
import {
  Alignment,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  AnchorButton
} from '@blueprintjs/core';
import { useQuery } from '@apollo/react-hooks';
import { GET_SYSTEM_INFO } from '../queries/info';
import { systemInfo } from '../generated/systemInfo';

export const Nav = () => {
  const { data: config } = useQuery<systemInfo>(GET_SYSTEM_INFO);

  const configLoaded = config && config.systemInfo;
  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>
          {configLoaded && config.systemInfo.companyName}
        </NavbarHeading>
        <NavbarDivider />
        <AnchorButton
          className={Classes.MINIMAL}
          icon="home"
          text="訂單列表"
          href="#"
        />
        <AnchorButton
          className={Classes.MINIMAL}
          icon="person"
          text="客戶設定"
          href="#/customers"
        />
        <AnchorButton
          className={Classes.MINIMAL}
          icon="box"
          text="產品設定"
          href="#/products"
        />
      </NavbarGroup>
    </Navbar>
  );
};
