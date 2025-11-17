// Setup file for Jest - matchers are now built into @testing-library/react-native v12.4+

// Mock Expo modules to prevent winter runtime errors
jest.mock('expo', () => ({
  ...jest.requireActual('expo'),
  __ExpoImportMetaRegistry: {}
}));

global.__ExpoImportMetaRegistry = {};

// Mock React Native components that have transform issues
jest.mock('react-native/Libraries/Components/ScrollView/ScrollView', () => {
  const React = require('react');
  return ({ children, ...props }) => React.createElement('ScrollView', props, children);
});

jest.mock('react-native/Libraries/Components/Keyboard/KeyboardAvoidingView', () => {
  const React = require('react');
  return ({ children, ...props }) => React.createElement('KeyboardAvoidingView', props, children);
});

// Mock react-native-paper components
jest.mock('react-native-paper', () => {
  const React = require('react');
  return {
    Provider: ({ children }) => children,
    DefaultTheme: {},
    Button: ({ children, onPress, ...props }) =>
      React.createElement('Button', { onPress, ...props, testID: props.testID || 'button' }, children),
    Text: ({ children, ...props }) =>
      React.createElement('Text', props, children),
    TextInput: ({ value, onChangeText, label, ...props }) =>
      React.createElement('TextInput', {
        value,
        onChangeText,
        placeholder: label,
        'aria-label': label,
        ...props
      }),
    HelperText: ({ children, ...props }) =>
      React.createElement('Text', props, children),
    ActivityIndicator: (props) =>
      React.createElement('ActivityIndicator', props),
    Card: ({ children, ...props }) =>
      React.createElement('View', props, children),
    FAB: ({ onPress, icon, ...props }) =>
      React.createElement('Button', { onPress, ...props, testID: 'fab' }, icon),
    Modal: ({ children, visible, ...props }) =>
      visible ? React.createElement('View', props, children) : null,
    Portal: ({ children }) => children,
    Divider: () => React.createElement('View'),
    IconButton: ({ onPress, icon, ...props }) =>
      React.createElement('Button', { onPress, ...props }, icon),
    Checkbox: ({ status, onPress, ...props }) =>
      React.createElement('Button', { onPress, ...props }, status === 'checked' ? '☑' : '☐'),
    Menu: ({ children, visible, anchor, ...props }) => {
      const Comp = () => (
        <>
          {anchor}
          {visible && children}
        </>
      );
      return React.createElement(Comp);
    },
  };
});
