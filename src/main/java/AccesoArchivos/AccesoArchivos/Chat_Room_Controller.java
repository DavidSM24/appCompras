package AccesoArchivos.AccesoArchivos;

import java.time.LocalDateTime;
import java.util.Arrays;

import AccesoArchivos.models.message_folder.Message;
import AccesoArchivos.models.room_folder.Room;
import AccesoArchivos.models.user_folder.User;
import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextArea;

public class Chat_Room_Controller {
	
	private User user;
	private Room room;
	private ObservableList<Message> messages=FXCollections.observableArrayList();
	private ObservableList<User> users=FXCollections.observableArrayList();
	
	@FXML
	protected Button btn_write;
	@FXML
	protected Label lab_room_Name;
	@FXML
	protected TextArea txt_write;
	@FXML
	protected TableView<Message> table_messages;
	@FXML
	protected TableColumn<Message, String> column_autor;
	@FXML
	protected TableColumn<Message, String> column_data;
	@FXML
	protected TableView table_users;
	@FXML
	protected TableColumn<User, String> column_user;
	
	@FXML
	public void setController(User u, Room r) {
		user=u;
		room=r;
		lab_room_Name.setText(r.getName());
		for(Message m:room.getMessages()) {
			messages.add(m);
		}
		for(User ua:room.getLog_users()) {
			users.add(ua);
		}
		table_messages.setItems(messages);
		table_users.setItems(users);
		setTableAndDetailsInfo();
		updateRoomInfo();
	}
	
	public void setTableAndDetailsInfo() {
		if (messages.size()>0) {
			column_autor.setCellValueFactory(eachroom->{
	    		SimpleStringProperty v=new SimpleStringProperty();
	    		v.setValue(eachroom.getValue().getUser().getName());
	    		return v;
	    	});
			
			column_data.setCellValueFactory(eachroom->{
	    		SimpleStringProperty v=new SimpleStringProperty();
	    		v.setValue(eachroom.getValue().getDate().toString()+"\n"+eachroom.getValue().getData());
	    		return v;
	    	});
			
			if (messages.size()>0) {
				column_user.setCellValueFactory(eachuser->{
		    		SimpleStringProperty v=new SimpleStringProperty();
		    		v.setValue(eachuser.getValue().getName());
		    		return v;
		    	});
			}
		}
	}
	
	private void updateRoomInfo(){
		//traerse los xml y actualizar messages y users arriba
		messages=FXCollections.observableArrayList();
		users=FXCollections.observableArrayList();
		for(Message m:room.getMessages()) {
			messages.add(m);
		}
		for(User u2:room.getLog_users()) {
			users.add(u2);
		}
		table_messages.setItems(messages);
		table_users.setItems(users);
		setTableAndDetailsInfo();
	}
	
	@FXML
	private void send_Message() {
		if(!txt_write.getText().matches("")) {
			String message="";
			int n=50;
			for(int i=0;i<txt_write.getText().length();i++) {
				if(n>0) {
					message+=txt_write.getText().charAt(i);
					n--;
				}
				else {	
					message+="-\n"+txt_write.getText().charAt(i);
					n=50;
				}
			}
			
			messages.add(new Message(0,LocalDateTime.now(),message,user,room));

			//guardar los xml
			txt_write.setText("");
				
		}
	}
	
	
}
