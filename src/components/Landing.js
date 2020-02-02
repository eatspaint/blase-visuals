import React, { useState } from 'react';
import styled, { createGlobalStyle, css, ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import PressStart from '../fonts/PressStart2P-Regular.ttf';

import { default as defaultTheme } from '../themes/default';
import { default as boujeeTheme } from '../themes/boujee';

const WithPressStart = createGlobalStyle`
  @font-face {
    font-family: PressStart;
    src: url('${PressStart}') format('truetype');
  }
  :root {
    font-size: 10px;
  }
`;

const withTransition = css`
  transition: all 0.2s ease-in-out;
`;

const Styles = styled.div`
  * {
    font-family: 'PressStart';
  }
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.bg};
  transition: all 1s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
Styles.defaultProps = {
  theme: defaultTheme,
}

const Title = styled.h1`
  margin: 0;
  font-size: 7.2rem;
  line-height: 10.8rem;
  color: ${props => props.theme.fg};
  ${withTransition};
`;
Title.defaultProps = {
  theme: defaultTheme,
}

const Subtitle = styled.h2`
  text-align: center;
  margin: 0;
  font-size: 3.6rem;
  line-height: 5.4rem;
  color: ${props => props.theme.fg};
  ${withTransition};
`;
Subtitle.defaultProps = {
  theme: defaultTheme,
}

const TrackList = styled.ol`
  color: ${props => props.theme.fg};
  ${withTransition};
  li {
    font-size: 2.4rem;
    line-height: 3.6rem;
  }
  a,
  a:visited {
    color: ${props => props.theme.accent};
    ${withTransition};
    text-decoration: none;
  }
`;
TrackList.defaultProps = {
  theme: defaultTheme,
}

const Landing = () => {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  return(
    <ThemeProvider theme={currentTheme}>
      <Styles>
        <WithPressStart />
        <Title>Blasé</Title>
        <Subtitle>an EP by Youzlow</Subtitle>
        <TrackList>
          <li
            onMouseEnter={() => setCurrentTheme(boujeeTheme)}
            onMouseLeave={() => setCurrentTheme(defaultTheme)}
          ><Link to='/boujee_blaster'>Boujee Blaster</Link></li>
          <li><Link to='/night_flyer'>Night Flyer</Link></li>
          <li><Link to='/signal'>Signal</Link></li>
        </TrackList>
      </Styles>
    </ThemeProvider>
  )
};

export default Landing;
