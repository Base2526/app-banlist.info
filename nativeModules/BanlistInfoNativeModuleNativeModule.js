//  Created by react-native-create-bridge

import { NativeModules } from 'react-native'

const { BanlistInfoNativeModule } = NativeModules

export default {
  exampleMethod () {
    return BanlistInfoNativeModule.exampleMethod()
  },

  EXAMPLE_CONSTANT: BanlistInfoNativeModule.EXAMPLE_CONSTANT
}
