package AccesoArchivos.models.room_folder;

import java.util.ArrayList;
import java.util.List;

import AccesoArchivos.models.message_folder.Message;
import AccesoArchivos.models.user_folder.User;

public class Room {
	
	private int id;
	private String name;
	private String description;
	private List<Message> messages; //<-- aqui solo se puede añadir
	private List<User> log_users; //<-- iran añadiendo y desapareciendo, empieza array vacío.
	
	public Room() {
		super();
		this.id=-1;
		this.name="Unknown";
		this.description="";
		this.messages=new ArrayList();
		this.log_users=new ArrayList();
	}
	
	public Room(int id, String name, String description, List<Message> messages, List<User> log_users) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.messages = messages;
		this.log_users = log_users;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	public List<Message> getMessages() {
		return messages;
	}
	
	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}
	
	public List<User> getLog_users() {
		return log_users;
	}
	
	public void setLog_users(List<User> log_users) {
		this.log_users = log_users;
	}

	@Override
	public String toString() {
		return "Room [id=" + id + ", name=" + name + ", description=" + description + ", messages=" + messages
				+ ", log_users=" + log_users + "]";
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!(obj instanceof Room))
			return false;
		Room other = (Room) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
	
	
}
