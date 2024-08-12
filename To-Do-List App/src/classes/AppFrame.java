package classes;

import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JButton;
import javax.swing.JFrame;

public class AppFrame extends JFrame{
	private TitleBar title;
	private List list;
	private ButtonPanel bPanel;
	
	private JButton addTask;
	private JButton clear;
	
	
	//constructor
	AppFrame() {
		//Makes size of the window//
	this.setSize(400,700);
	//Closes app
	this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	//Makes window visible//
	this.setVisible(true);
	
	title = new TitleBar();
	list = new List();
	bPanel = new ButtonPanel();
	this.add(title,BorderLayout.NORTH);
	this.add(bPanel,BorderLayout.SOUTH);
	
	
	this.add(list,BorderLayout.CENTER);
	
	addTask = bPanel.getAddTask();
	clear = bPanel.getClear();
	//adds listeners///
	addListeners();
	}
	
	public void addListeners() {
		
		addTask.addMouseListener(new MouseAdapter() {
			@Override
			public void mousePressed(MouseEvent e) {
				//Creates a new task and adds it to the list//
				Task task = new Task();
				list.add(task);
				list.updateNumbers();
				
				task.getDone().addMouseListener(new MouseAdapter(){
					@Override
					public void mousePressed(MouseEvent e) {
						task.changeState();
						list.revalidate();
						list.repaint();
					}
				});
				//revalidates and repaints the list//
				list.revalidate();
				list.repaint();
			}
			
		});
		//listiner for the clear button//
		clear.addMouseListener(new MouseAdapter() {
			@Override
			public void mousePressed(MouseEvent e) {
				clearCompletedTasks();
				
				
			}
		});
		
	}
	private void clearCompletedTasks() {
        Component[] listItems = list.getComponents();
        for (Component item : listItems) {
            if (item instanceof Task) {
                Task task = (Task) item;
                //If the task is checked in window, removes it//
                if (task.isChecked()) {
                    list.remove(task);
                }
            }
        }
        //updates the numbers after and refreshes//
        list.updateNumbers();
        list.revalidate();
        list.repaint();
    }
	

}
