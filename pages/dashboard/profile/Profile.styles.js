import styled from 'styled-components';
import { palette } from 'styled-theme';

export const Navigation = styled.div`
  background-color: #ffffff;
  pointer-events: all;
  box-shadow: 0 1px 2px #e5e5e5;
  ul.profile-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 667px) {
      justify-content: flex-start;
    }
    li {
      margin: 0 15px;
      display: block;
      padding: 18px 15px 19px;
      color: ${palette('secondary', 5)};
      font-size: 14px;
      font-weight: 400;
      cursor: pointer;
      @media only screen and (max-width: 320px) {
        margin: 0 7px;
      }
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
      strong {
        font-size: 18px;
        font-weight: 600;
        margin-right: 4px;
      }
      &.active {
        border-bottom: 2px solid ${palette('secondary', 5)};
      }
    }
  }
`;

export default Navigation;
