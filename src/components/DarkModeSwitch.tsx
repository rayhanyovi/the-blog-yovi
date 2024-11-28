"use client";

import { Switch } from "antd";
import React from "react";
import { useTheme } from "@/contexts/themeContexts";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

const DarkModeSwitch = () => {
  const { isDark, setIsDark } = useTheme();

  const toggleDarkMode = () => {
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark-mode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark-mode", "false");
    }
    setIsDark(!isDark);
  };

  return (
    <Switch
      checked={isDark}
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<SunOutlined />}
      onChange={toggleDarkMode}
    />
  );
};

export default DarkModeSwitch;
