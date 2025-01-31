def select_transport(mode, weight, distance):
    if mode == "speed-post":
        if distance > 1000:
            if weight <= 30:
                return "Airways (Direct)"
            else:
                return "Airways with Transit Hub"
        elif 500 <= distance <= 1000:
            return "Railways"
        else:
            return "Roadways (0-500km)"
    elif mode == "priority":
        if weight > 30:
            return "Railways and Roadways (Merge)"
        else:
            return "Train + Truck"
    elif mode == "ordinary":
        if weight > 30:
            if distance > 1000:
                return "Railways and Roadways (Merge)"
            elif 200 <= distance <= 1000:
                return "Railways"
            else:
                return "Roadways"
        else:
            return "Roadways"
    return "Invalid input"
