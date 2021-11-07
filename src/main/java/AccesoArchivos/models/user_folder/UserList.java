package AccesoArchivos.models.user_folder;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.JAXBException;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import AccesoArchivos.models.message_folder.Message;
import AccesoArchivos.models.message_folder.MessageList;
import AccesoArchivos.utils.JAXBManagerMessages;
import AccesoArchivos.utils.JAXBManagerRooms;
import AccesoArchivos.utils.JAXBManagerUsers;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name="UserList")
public class UserList  implements Serializable{
	@XmlElement(name="Users",type=User.class)
	private static List<User> Users= new ArrayList();

	public UserList() {}

	public List<User> getUsers() {
		return Users;
	}

	public void setUsers(List<User> users) {
		Users = users;
	}
	
	public void addUser(User newUser) {
		this.Users.add(newUser);
	}
	public void removeUser(User OldUser) throws JAXBException {
	UserList users= new UserList();
		OldUser.setName(OldUser.getName()+"_Erased");
		users.addUser(OldUser);
		JAXBManagerUsers.marshal(users, "UsersList.xml");

		/*JAXBManagerMessages;
		JAXBManagerRooms*/
	}
	
	public ObservableList<User> accesUsersAsObservable() {
		ObservableList<User> result=FXCollections.observableArrayList();
		for(User u:Users) {
			result.add(u);
		}
		return result;
	}
}
