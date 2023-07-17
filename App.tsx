import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Pressable, useWindowDimensions } from 'react-native';
import { useState, useEffect } from "react";
import { Feather, Entypo, Ionicons  } from '@expo/vector-icons';

import { shared, styles } from "./styles/index";
import { convert, currencies } from "./helpers/currencies";

const plus = <Entypo name="plus" color="lime" style={styles.padIcon} />;
const minus = <Entypo name="minus" color="red" style={styles.padIcon}/>;
const refresh = <Ionicons name="refresh" color="red" style={styles.padIcon}/>
const backspace = <Ionicons name="backspace-outline" style={styles.padIcon} />;

const grid = [
  { i: 0, value: 7, label: "7", type: "number" },
  { i: 1, value: 8, label: "8", type: "number" },
  { i: 2, value: 9, label: "9", type: "number" },
  { i: 3, value: "refresh", label: refresh,  type: "function" },
  { i: 4, value: 4, label: "4", type: "number" },
  { i: 5, value: 5, label: "5", type: "number" },
  { i: 6, value: 6, label: "6", type: "number" },
  { i: 7, value: "add", label: plus, type: "function" },
  { i: 8, value: 1, label: "1", type: "number" },
  { i: 9, value: 2, label: "2", type: "number" },
  { i: 10, value: 3, label: "3", type: "number" },
  { i: 11, value: "sub", label: minus, type: "function" },
  { i: 12, value: ".", label: ".", type: "number" },
  { i: 13, value: 0, label: "0", type: "number" },
  { i: 14, value: "backspace", label: backspace, type: "function" },
  { i: 15, value: "equals", label: "=", type: "function" },
];

export default function App({ navigation }) {

  const { height, width } = useWindowDimensions();

  const [ top, setTop ] = useState({ symbol: currencies[0].symbol, label: currencies[0].label , value: "0" });
  const [ bottom, setBottom ] = useState({ symbol: currencies[1].symbol, label: currencies[1].label, value: "0" });

  const [focus, setFocus] = useState("bottom");
  const [index, setIndex] = useState(-1);


  const accessModalFrom = side => {}

  const handleInputChange = (text: string) => {
    if(focus === "top") setTop({ ...top, value: text });
    if(focus === "bottom") setBottom({ ...bottom, value: text });
  }

  const handleFocus = value => setFocus(value);

  const handleButtonPress = (num) => {
    if (num.value === "equals") {
      setTimeout(() => {
        performCurrencyConversion();
      }, 100); // Adjust the delay as needed
    } else if(num.value ==="add"){

    } else if(num.value ==="sub"){

    } else if(num.value ==="refresh"){
      if(focus === "top" && top.value) setTop({ ...top, value: "0" });
      if(focus === "bottom" && bottom.value) setBottom({ ...bottom, value: "0" })
    } else if(num.value ==="backspace"){
      if(focus === "top" && top.value) setTop({ ...top, value: top.value.slice(0, -1) });
      if(focus === "bottom" && bottom.value) setBottom({ ...bottom, value: bottom.value.slice(0, -1) })
    } else if(focus === "top") setTop({ ...top, value: top.value + num.value });
      else if(focus === "bottom") setBottom({ ...bottom, value: bottom.value + num.value })
};

  const performCurrencyConversion = async () => {

    const topValue = top.value;
    const bottomValue = bottom.value;
    const topCurrency = top.label;
    const bottomCurrency = bottom.label;

    try {
      if (focus === "bottom") {
        const newValue = await convert(bottomValue, bottomCurrency, topCurrency);
        setTop({ ...top, value: newValue });
      } else if (focus === "top") {
        const newValue = await convert(topValue, topCurrency, bottomCurrency);
        setBottom({ ...bottom, value: newValue });
      }
    } catch (error) {
      console.log("Currency conversion error:", error);
    }

  };


  return (
    <View style={styles.container}>

      <StatusBar style="light" />

      <View style={styles.conversion}>
        <View style={styles.tofrom}>

          <View style={styles.format}>
            <Pressable onPress={() => accessModalFrom("top")} id="top">
              <Text style={styles.format.text}>
                {top.symbol} {top.label}
              </Text>
            </Pressable>
          </View>

          <View style={styles.values}>
            <TextInput
              style={{...styles.valuesText, fontSize: 45 }}
              value={Number(top.value).toLocaleString()}
              placeholder="0"
              data-name='top'
              maxLength={13}
              showSoftInputOnFocus={false}
              keyboardType="number-pad"
              onFocus={() => handleFocus("top")}
              onChangeText={handleInputChange}
            />
            <Text style={styles.formatted}>
              {`${top.symbol} ${Number(top.value).toLocaleString()}`}
            </Text>
          </View>
        </View>


        <View style={styles.tofrom}>

          <View style={styles.format}>
            <Pressable onPress={() => accessModalFrom("bottom")} id="bottom">
              <Text style={styles.format.text}>
                 {bottom.symbol} {bottom.label}
              </Text>
            </Pressable>
          </View>

          <View style={styles.values}>

            <TextInput

              style={{...styles.valuesText, fontSize: 45 }}
              value={Number(bottom.value).toLocaleString()}
              placeholder="0"
              maxLength={13}
              keyboardType="number-pad"
              data-name='bottom'
              showSoftInputOnFocus={false}
              onFocus={() => handleFocus("bottom")}
              onChangeText={handleInputChange}
            />

            <Text style={styles.formatted}>
              {`${bottom.symbol} ${Number(bottom.value).toLocaleString()}`}
            </Text>

          </View>



        </View>

      </View>

      <View style={styles.pad}>
        {grid.map((num, i)  => {
          return (
            <Pressable
            key={i}
            style={({ pressed }) => pressed ? styles.PressedPadButton(height, width) : styles.UnPressedPadButton(height, width)}
            onPressIn={() => handleButtonPress(num)}
            >
              <Text style={styles.padButtonText}>{num.label}</Text>
            </Pressable>
          )
        })}
      </View>

      {index === 1 && <BottomModal setIndex={setIndex} side={focus} />}

    </View>
  );
}
