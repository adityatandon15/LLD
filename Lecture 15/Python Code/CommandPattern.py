# ----------------------------
# Command Interface
# ----------------------------
class Command:
    def execute(self):
        pass

    def undo(self):
        pass


# ----------------------------
# Receivers
# ----------------------------
class Light:
    def on(self):
        print("Light is ON")

    def off(self):
        print("Light is OFF")


class Fan:
    def on(self):
        print("Fan is ON")

    def off(self):
        print("Fan is OFF")


# ----------------------------
# Concrete Command for Light
# ----------------------------
class LightCommand(Command):
    def __init__(self, light):
        self.light = light

    def execute(self):
        self.light.on()

    def undo(self):
        self.light.off()


# ----------------------------
# Concrete Command for Fan
# ----------------------------
class FanCommand(Command):
    def __init__(self, fan):
        self.fan = fan

    def execute(self):
        self.fan.on()

    def undo(self):
        self.fan.off()


# ----------------------------
# Invoker: Remote Controller with static array of 4 buttons
# ----------------------------
class RemoteController:
    numButtons = 4

    def __init__(self):
        self.buttons = [None] * self.numButtons
        self.buttonPressed = [False] * self.numButtons  # False = off, True = on

    def set_command(self, idx, cmd):
        if 0 <= idx < self.numButtons:
            self.buttons[idx] = cmd
            self.buttonPressed[idx] = False

    def press_button(self, idx):
        if 0 <= idx < self.numButtons and self.buttons[idx] is not None:
            if not self.buttonPressed[idx]:
                self.buttons[idx].execute()
            else:
                self.buttons[idx].undo()

            self.buttonPressed[idx] = not self.buttonPressed[idx]
        else:
            print(f"No command assigned at button {idx}")


# ----------------------------
# Main Application
# ----------------------------
if __name__ == "__main__":
    living_room_light = Light()
    ceiling_fan = Fan()

    remote = RemoteController()

    remote.set_command(0, LightCommand(living_room_light))
    remote.set_command(1, FanCommand(ceiling_fan))

    # Simulate button presses (toggle behavior)
    print("--- Toggling Light Button 0 ---")
    remote.press_button(0)  # ON
    remote.press_button(0)  # OFF

    print("--- Toggling Fan Button 1 ---")
    remote.press_button(1)  # ON
    remote.press_button(1)  # OFF

    # Press unassigned button to show default message
    print("--- Pressing Unassigned Button 2 ---")
    remote.press_button(2)