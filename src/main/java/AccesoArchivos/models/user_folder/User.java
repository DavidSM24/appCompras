package AccesoArchivos.models.user_folder;

public class User {
	
	private int id;
	private String name;
	private String password;
	private boolean online;
	
	public User() {
		this.id=-999;
		this.name="Unknown";
		this.password="";
		this.online=false;
	}
	
	public User(int id, String name, String password,boolean online) {
		super();
		this.id = id;
		this.name = name;
		this.password = password;
		this.online=online;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	
	public boolean isOnline() {
		return online;
	}

	public void setOnline(boolean online) {
		this.online = online;
	}

	
	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", password=" + password + ", online=" + online + "]";
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!(obj instanceof User))
			return false;
		User other = (User) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
	
	
	
}
