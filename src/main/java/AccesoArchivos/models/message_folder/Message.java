package AccesoArchivos.models.message_folder;


import java.time.LocalDateTime;

import AccesoArchivos.models.room_folder.Room;
import AccesoArchivos.models.user_folder.User;

public class Message {
	
	private int id;
	private LocalDateTime date;
	private String data;
	private User user; //<-- ¿que pasa si borras el user?
	//private String user_name;  ???  <--solución?
	private Room room;
	
	public Message() {
		this.date=null;
		this.data="";
		this.user=null;
		this.room=null;
	}
	
	public Message(int id, LocalDateTime date, String data, User user, Room room) {
		super();
		this.id = id;
		this.date = date;
		this.data = data;
		this.user = user;
		this.room = room;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Room getRoom() {
		return room;
	}

	public void setRoom(Room room) {
		this.room = room;
	}

	@Override
	public String toString() {
		return "Message [id=" + id + ", date=" + date + ", data=" + data + ", user=" + user + ", room=" + room + "]";
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!(obj instanceof Message))
			return false;
		Message other = (Message) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
	
	
}
