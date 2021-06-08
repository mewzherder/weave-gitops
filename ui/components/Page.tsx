import { Breadcrumbs, Tab, Tabs } from "@material-ui/core";
import _ from "lodash";
import React, { forwardRef } from "react";
import styled from "styled-components";
import useNavigation from "../hooks/navigation";
import { PageRoute } from "../lib/types";
import { formatURL, getNavValue } from "../lib/utils";
import Flex from "./Flex";
import Icon, { IconType } from "./Icon";
import Link from "./Link";
import Logo from "./Logo";

type Props = {
  className?: string;
  children?: any;
  title: string;
  breadcrumbs?: { page: PageRoute; query?: any }[];
};

const navItems = [{ value: PageRoute.Applications, label: "Applications" }];

const LinkTab = (props) => (
  <Tab
    component={forwardRef((p: any, ref) => (
      <Link innerRef={ref} {...p} />
    ))}
    {...props}
  />
);

const StyleLinkTab = styled(LinkTab)`
  span {
    align-items: flex-start;
    color: #4b4b4b;
  }
`;

const negativeSpaceColor = "#E6E6E6";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  background-color: ${negativeSpaceColor};
`;

const NavContainer = styled.div`
  width: 240px;
  background-color: ${(props) => props.theme.colors.white};
  padding-top: ${(props) => props.theme.spacing.medium};
  padding-right: ${(props) => props.theme.spacing.medium};
  background-color: ${negativeSpaceColor};
`;

const NavContent = styled.div`
  background-color: white;
  height: 100vh;
  padding-top: ${(props) => props.theme.spacing.medium};
  padding-left: ${(props) => props.theme.spacing.xs};
  padding-right: ${(props) => props.theme.spacing.xl};

  .MuiTab-wrapper {
    text-transform: capitalize;
    font-size: 20px;
    font-weight: bold;
  }

  .MuiTabs-indicator {
    left: 0;
    width: 4px;
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  padding-top: ${(props) => props.theme.spacing.medium};
  padding-bottom: ${(props) => props.theme.spacing.medium};
  padding-right: ${(props) => props.theme.spacing.medium};
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.white};
  padding-left: ${(props) => props.theme.spacing.large};
  padding-right: ${(props) => props.theme.spacing.large};
  padding-top: ${(props) => props.theme.spacing.large};
  padding-bottom: ${(props) => props.theme.spacing.medium};
`;

const TitleBar = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.large};

  h2 {
    margin: 0 !important;
  }
`;

const Main = styled(Flex)`
  flex: 1 1 auto;
`;

const TopToolBar = styled(Flex)`
  padding: 8px 0;
  background-color: ${(props) => props.theme.colors.primary};
  width: 100%;
  height: 112px;
  flex: 0 1 auto;

  ${Logo} img {
    width: 136px;
    height: 42px;
  }
`;

const UserAvatar = styled(Icon)`
  padding-right: ${(props) => props.theme.spacing.medium};
`;

function pageLookup(p: PageRoute) {
  switch (p) {
    case PageRoute.Applications:
      return "Applications";

    default:
      break;
  }
}

function Page({ className, children, title, breadcrumbs }: Props) {
  const { currentPage } = useNavigation();
  return (
    <div className={className}>
      <AppContainer>
        <TopToolBar between align>
          <Logo />
          <UserAvatar size="xl" type={IconType.Account} color="white" />
        </TopToolBar>
        <Main wide>
          <NavContainer>
            <NavContent>
              <Tabs
                centered={false}
                orientation="vertical"
                value={getNavValue(currentPage)}
              >
                {_.map(navItems, (n) => (
                  <StyleLinkTab
                    value={n.value}
                    key={n.value}
                    label={n.label}
                    to={formatURL(n.value)}
                  />
                ))}
              </Tabs>
            </NavContent>
          </NavContainer>
          <ContentContainer>
            <Content>
              <TitleBar>
                <Breadcrumbs>
                  {breadcrumbs &&
                    _.map(breadcrumbs, (b) => (
                      <Link key={b.page} to={formatURL(b.page, b.query)}>
                        <h2>{pageLookup(b.page)}</h2>
                      </Link>
                    ))}
                  <h2>{title}</h2>
                </Breadcrumbs>
              </TitleBar>
              <div>{children}</div>
            </Content>
          </ContentContainer>
        </Main>
      </AppContainer>
    </div>
  );
}

export default styled(Page)`
  display: flex;
`;
