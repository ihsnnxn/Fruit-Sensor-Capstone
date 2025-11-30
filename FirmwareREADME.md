# Firmware (nRF9160-DK) - Skeleton

This folder contains a minimal C-style skeleton and pseudocode for the nRF9160 firmware.
The implementation target is Zephyr / nRF Connect SDK.

Files:
- main.c          : skeleton demonstrating capture/save/upload flow
- capture_flow.psc: human-readable pseudocode (for report)
- CMakeLists.txt  : placeholder for Zephyr build

  - modem: nrf_modem_at_cmd / nrf_modem_lib
  - mqtt: zephyr's MQTT client or nrf_cloud/mqtt sample
  - SD: FATFS or LittleFS

