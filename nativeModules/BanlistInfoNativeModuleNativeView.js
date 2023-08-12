//  Created by react-native-create-bridge

import React, { Component } from 'react'
import { requireNativeComponent } from 'react-native'

const BanlistInfoNativeModule = requireNativeComponent('BanlistInfoNativeModule', BanlistInfoNativeModuleView)

export default class BanlistInfoNativeModuleView extends Component {
  render () {
    return <BanlistInfoNativeModule {...this.props} />
  }
}

BanlistInfoNativeModuleView.propTypes = {
  exampleProp: React.PropTypes.any
}
