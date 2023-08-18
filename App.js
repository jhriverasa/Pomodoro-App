import { useEffect, useState } from "react";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";

import Header from "./src/components/Header";
import Timer from "./src/components/Timer";

const bgColors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [time, setTime] = useState(60 * 25);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 10);
    } else {
      clearInterval(interval);
    }
    if (time == 0) {
      setIsActive(false)
      playAlarmSound()
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const playClickSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.wav")
    );
    await sound.playAsync();
  };

  const playAlarmSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/alarm.wav")
    );
    await sound.playAsync();
  };

  const handleStartStop = () => {
    playClickSound();
    setIsActive(!isActive);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: bgColors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === "android" && 30,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>

        <Header
          setTime={setTime}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setIsActive={setIsActive}
        />
        <Timer time={time} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleStartStop();
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: { fontSize: 32, fontWeight: "bold" },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center",
  },
});
