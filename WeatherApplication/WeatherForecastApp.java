package classes;

import javax.swing.*; // Importing Swing for GUI components
import java.awt.*; // Importing AWT for layout
import java.awt.event.ActionEvent; // Importing AWT for action events
import java.awt.event.ActionListener; // Importing AWT for action listeners
import java.io.BufferedReader; // Importing BufferedReader for reading input streams
import java.io.InputStreamReader; // Importing InputStreamReader for reading input streams
import java.net.HttpURLConnection; // Importing HttpURLConnection for HTTP connections
import java.net.URL; // Importing URL for network operations
import org.json.simple.JSONArray; // Importing JSONSimple for JSON arrays
import org.json.simple.JSONObject; // Importing JSONSimple for JSON objects
import org.json.simple.JSONValue; // Importing JSONSimple for parsing JSON

public class WeatherForecastApp {

    // Declaring GUI components and API key
    private static JFrame frame;
    private static JTextField locationField;
    private static JTextArea weatherDisplay;
    private static JButton fetchButton;
    private static String apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxx"; // API key that ii obtained from OpenWeatherMap

    // Method to fetch weather data for a given city
    private static String fetchWeatherData(String city) {
        try {
            // Forming the URL for the API request
            URL url = new URL("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET"); // Setting the request method to GET

            // Reading the response from the API
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            // Parsing the JSON response
            JSONObject jsonObject = (JSONObject) JSONValue.parse(response.toString());
            JSONObject mainObj = (JSONObject) jsonObject.get("main");

            // Extracting temperature and humidity from the JSON response
            double temperatureKelvin = (double) mainObj.get("temp");
            long humidity = (long) mainObj.get("humidity");

            // Converting temperature from Kelvin to Celsius and Fahrenheit
            double temperatureCelsius = temperatureKelvin - 273.15;
            double temperatureFahrenheit = (temperatureKelvin - 273.15) * 9/5 + 32;

            // Retrieving weather description from the JSON response
            JSONArray weatherArray = (JSONArray) jsonObject.get("weather");
            JSONObject weatherObj = (JSONObject) weatherArray.get(0);
            String description = (String) weatherObj.get("description");

            // Formatting and returning the weather information
            return String.format("Description: %s\nTemperature: %.2f Celsius / %.2f Fahrenheit\nHumidity: %d%%", 
                                 description, temperatureCelsius, temperatureFahrenheit, humidity);
        } catch (Exception e) {
            e.printStackTrace(); // Printing the stack trace for debugging
            return "Failed to fetch weather data. Please check your city and API key."; // Error message
        }
    }

    // Main method to initialize the GUI and set up event handling
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            frame = new JFrame("Weather Forecast App"); // Creating the main frame
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // Setting default close operation
            frame.setSize(400, 300); // Setting frame size
            frame.setLayout(new FlowLayout()); // Setting layout

            locationField = new JTextField(15); // Creating text field for city input
            fetchButton = new JButton("Fetch Weather"); // Creating button to fetch weather data
            weatherDisplay = new JTextArea(10, 30); // Creating text area to display weather data
            weatherDisplay.setEditable(false); // Making the text area non-editable

            // Adding components to the frame
            frame.add(new JLabel("Enter City Name:"));
            frame.add(locationField);
            frame.add(fetchButton);
            frame.add(new JScrollPane(weatherDisplay));

            // Adding action listener to the button
            fetchButton.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    String city = locationField.getText(); // Getting the city name from the text field
                    String weatherInfo = fetchWeatherData(city); // Fetching weather data
                    weatherDisplay.setText(weatherInfo); // Displaying the weather data
                }
            });

            frame.setVisible(true); // Making the frame visible
        });
    }
}


