import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];

const Header = ({ setIsActive, currentTime, setCurrentTime, setTime }) => {
  const handlePress = (i) => {
    let newTime;
    if (i === 0) {
      newTime = 25;
    } else if (i === 1) {
      newTime = 5;
    } else {
      newTime = 15;
    }
    setCurrentTime(i);
    setIsActive(false);
    setTime(newTime * 60);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {options.map((option, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.itemStyle,
              currentTime !== index && { borderColor: "transparent" },
            ]}
            onPress={() => {
              handlePress(index);
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    width: "33%",
    borderWidth: 3,
    padding: 5,
    borderColor: "white",
    marginVertical: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default Header;
