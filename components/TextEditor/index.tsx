import { useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";

type Props = {
  handleChange: (descriptionText: string) => void;
};

const handleHead = ({ tintColor }) => (
  <Text style={{ color: tintColor }}>H1</Text>
);
const TextEditor = ({ handleChange }: Props) => {
  const richText = useRef();

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <RichEditor
            ref={richText}
            style={{
              height: "100%",
              borderWidth: 1,
              borderColor: "#cccccc",
              borderRadius: 16,
              paddingVertical: 8,
              paddingHorizontal: 12,
              backgroundColor: "#f0f0f0",
              // fontSize: 16,
              // color: "#33333",
              // textAlignVertical: "top",
            }}
            onChange={handleChange}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <RichToolbar
        editor={richText}
        actions={[actions.setBold, actions.setItalic, actions.setUnderline]}
      />
    </SafeAreaView>
  );
};

export default TextEditor;
