/* @flow */

import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import Container from '@components/Container'
import Title from '@components/Title'
import Link from '@components/Link'

const popToHome = () => {
  console.log(Actions,'this is actions')
  Actions.drawer();
}


class LauchContainer extends Component<void, void, void> {
  componentDidMount () {
    this.timer = setTimeout(
      () => {
        popToHome();
      }
    ,3000)
  }
  render() {
    return (
      <Container>
        <Title>Hey you ! =)</Title>
        <Title> Wellcome to Stylewe </Title>
      </Container>
    )
  }
}

export default LauchContainer
