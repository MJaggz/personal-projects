package classes;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;

import javax.swing.BorderFactory;
import javax.swing.Box;
import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.border.*;

public class ButtonPanel extends JPanel {
	
 private JButton addTask;//Button to add tasks//
 private JButton clear;//Button to clear tasks//
 
 
 Border emptyBorder = BorderFactory.createEmptyBorder();
 //Makes an empty border//
 
 //Constructor
 ButtonPanel(){
	 this.setPreferredSize(new Dimension(400,60));
	 //this.setBackground(Color.red);
	 
	 //Initializes the "Add Task" button and customizes it//
	 addTask = new JButton("Add Task");
	 addTask.setBorder(emptyBorder);
	 addTask.setFont(new Font("Sans-Serif",Font.PLAIN, 20));
	 this.add(addTask);
	 addTask.setForeground(new Color(186,202,203));
	 
	 this.add(Box.createHorizontalStrut(20));
	 
	//Initializes the "Clear Completed Tasks" button and customizes it//
	 clear = new JButton("Clear Completed Tasks");
	 clear.setBorder(emptyBorder);
	 clear.setFont(new Font("Sans-Serif",Font.PLAIN, 20));
	 clear.setForeground(new Color(186,202,203));
	 this.add(clear);
	 this.setBackground(new Color(28, 195, 213));
 }
 
 
 	public JButton getAddTask() {
 		return addTask;
 	}
 	
 	public JButton getClear() {
 		return clear;
 	}

}
