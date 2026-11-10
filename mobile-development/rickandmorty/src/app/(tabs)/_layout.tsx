import { NativeTabs } from "expo-router/build/native-tabs/NativeTabs.js";

export default function TabsLayout() {
  return (
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="Gallery">
          <NativeTabs.Trigger.Icon sf="rectangle.stack" md="image" />
          <NativeTabs.Trigger.Label>Gallery</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
  );
}
