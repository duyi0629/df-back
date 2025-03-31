import styled, { keyframes } from "styled-components";

const slideLeftLeaveTo = keyframes`
 from {
    opacity: 1;
    transform: translateX(100%);
  }
  to {
    opacity: 0;
    transform: translateX(0);
  }
 
`;

const slideLeftLeaveActive = keyframes`
  from {
    opacity: 0;
    transform: translateX(0);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
export const Wrapper = styled.div`
  /* .leave {
    transition: 0.25s cubic-bezier(0.25, 0.8, 0.5, 1);
    animation: rotate 3s ease-in-out 3s forwards;
  } */

  .slide-left-enter-from,
  .slide-left-leave-to {
    opacity: 0;
    transform: translate(-150px);
  }
  /* &.slide-left-leave-active {
    transition: 105s cubic-bezier(0.25, 0.8, 0.5, 1);
  } */

  .slide-right-enter-to {
    opacity: 0;
    transform: translateX(20px);
  }
  .slide-right-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: all 0.3s ease-out;
  }
`;
