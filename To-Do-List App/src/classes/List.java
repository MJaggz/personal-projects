package classes;

import java.awt.Color;
import java.awt.Component;
import java.awt.GridLayout;

import javax.swing.JPanel;

public class List extends JPanel {
	
	List(){//10 rows 1 col
		GridLayout layout = new GridLayout(10,1);
		layout.setVgap(5);
		
		this.setLayout(layout);
		//this.setBackground(Color.YELLOW);
		this.setBackground(new Color(28, 195, 213));
		
	}
	public void updateNumbers() {
		//ArrayList to hold items in the app//
		Component[] listItems = this.getComponents();
		
		for(int i = 0; i < listItems.length; i++) {
			if(listItems[i] instanceof Task) {
				((Task)listItems[i]).changeIndex(i+1);
			}
		}
	}

}
