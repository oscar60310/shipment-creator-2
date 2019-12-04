import React from 'react';
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  AnchorButton
} from '@blueprintjs/core';

export const Nav = () => {
  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>CC</NavbarHeading>
        <NavbarDivider />
        <AnchorButton
          className={Classes.MINIMAL}
          icon="home"
          text="訂單列表"
          href="#"
        />
        <AnchorButton
          className={Classes.MINIMAL}
          icon="cog"
          text="基本設定"
          href="#/setting"
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
