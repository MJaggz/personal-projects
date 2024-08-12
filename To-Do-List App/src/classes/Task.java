package classes;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

public class Task extends JPanel {
	private JLabel index;
	private JTextField taskName;//For task name//
	private JButton done;
	
	
	private boolean checked;//To indicate if task is done//
	//constructor
	Task(){
		this.setPreferredSize(new Dimension(40,20));
		this.setBackground(Color.BLACK);
		
		this.setLayout(new BorderLayout());
		
		
		checked = false;
		
		
		index = new JLabel("");
		index.setPreferredSize(new Dimension(20,20));
		index.setHorizontalAlignment(JLabel.CENTER);
		this.add(index,BorderLayout.WEST);
		
		//Initializes the task name with this default text and configures it//
		taskName = new JTextField("Your Task Here");
		taskName.setBorder(BorderFactory.createEmptyBorder());
		//taskName.setBackground(Color.RED);
		this.setBackground(new Color(28, 195, 213));
		taskName.setForeground(new Color(186,202,203));
		
		
		this.add(taskName,BorderLayout.CENTER);
		
		//Initializes the "Done" text and configures it//
		done = new JButton("Done");
		done.setPreferredSize(new Dimension(40,20));
		done.setBorder(BorderFactory.createEmptyBorder());
		
		
		this.add(done,BorderLayout.EAST);
		
		
	}//Method for the "Done" button//
	public JButton getDone() {
		return done;
	}//Method to change the index//
	public void changeIndex(int num) {
		this.index.setText(num+"");
		this.revalidate();
	}//Method to change the state//
	public void changeState() {
		this.setBackground(Color.GREEN);
		taskName.setBackground(Color.GREEN);
		checked = true;
	}//Boolean method to check if the task is done//
	public boolean isChecked() {
		return checked;
	}

}
