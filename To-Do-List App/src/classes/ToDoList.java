package classes;

import javax.swing.JFrame;
import javax.swing.SwingUtilities;

public class ToDoList {
    public static void main(String args[]) {
    	//Launches the GUII Event Thread//
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
            	//Creates the main app frame//
                new AppFrame();
            }
        });
    }
}
