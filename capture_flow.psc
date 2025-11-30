INITIALIZE camera
INITIALIZE SD card
INITIALIZE NB-IoT modem
INITIALIZE MQTT client
INITIALIZE sensors (temp, rh, pressure)
QUEUE = persistent_queue_init()

LOOP forever:
  if external_button_pressed() or mqtt_command_received("capture"):
    camera.wake()
    camera.auto_exposure()
    img = camera.capture(timeout=5000)
    if img == NULL:
        log("capture failed")
        camera.sleep()
        continue

    fname = format("/images/IMG_%Y%m%d_%H%M%S.jpg", now())
    if sd_write(fname, img):
       meta = {
         "device_id": DEVICE_ID,
         "timestamp": now_iso(),
         "image_name": fname,
         "sensor": read_sensors()
       }
       queue.enqueue(meta)
    else:
       log("SD write failed")

    camera.sleep()

  if network_available():
    while queue.has_items():
      item = queue.peek()
      thumb = generate_thumbnail(item.image_name)
      payload = make_payload(item, thumb)
      if mqtt_publish("devices/"+DEVICE_ID+"/telemetry", payload):
         queue.dequeue()
      else:
         break
  sleep(1s)
END LOOP
