package classes;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;

import javax.swing.JLabel;
import javax.swing.JPanel;

public class TitleBar extends JPanel {

	//constructor
	
	TitleBar(){
		//Sets the size of the panel//
		this.setPreferredSize(new Dimension(400,80));
		//Jlabel for title text//
		JLabel titleText = new JLabel ("To Do List");
		//Sets the size for the text//
		titleText.setPreferredSize(new Dimension(200,80));
		//Sets the font for the text//
		titleText.setFont(new Font("Sans-serif",Font.BOLD,20));
		titleText.setHorizontalAlignment(JLabel.CENTER);
		//Sets the background color for the panel//
		this.setBackground(new Color(28, 195, 213));
		//Sets the background color for the title text//
		titleText.setForeground(new Color(186,202,203));
		
		this.add(titleText);
	}
	
}
