import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, ActionSheetIOS, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import Constants from 'expo-constants';

const DATA = [
  {
    id: '0',
    title: 'Pre-School',
  },
  {
    id: '1',
    title: 'High School',
  },
  {
    id: '2',
    title: 'Undergraduate Student',
  },
  {
    id: '3',
    title: 'Masters Student',
    
  },
  {
    id: '4',
    title: 'PhD Student',
  },
  {
    id: '5',
    title: 'No Education',
  },

];

function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? '#00ff00' : '#ff0000' },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}



export default function App() {
  const [result, setResult] = useState("Random Number!");
  const [selected, setSelected] = React.useState(new Map());
  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      setSelected(newSelected);
    },
    [selected],
  );

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Generate Number", "Reset"],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          //cancel action
        } else if (buttonIndex === 1) {
          setResult(Math.floor(Math.random() * 100) + 1);
        } else if (buttonIndex === 2) {
          setResult("Random Number!");
        }
      }
    );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.result}>{result}</Text>
      <Button onPress={onPress} title="Click here to see options!"/>
      <Text style={styles.text}>What type of student are you?</Text>
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <Item
          id={item.id}
          title={item.title}
          selected={!!selected.get(item.id)}
          onSelect={onSelect}
        />
      )}
      keyExtractor={item => item.id}
      extraData={selected}
    />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#ff0000',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  title: {
    flex: 4,
    fontSize: 32,
    textAlign: 'center',
  },
  result: {
    fontSize: 40,
    textAlign: "center",

  },
  text: {
    fontSize: 20,
    textAlign: "center",

  }


});
