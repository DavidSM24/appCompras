package AccesoArchivos.models.room_folder;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name="RoomList")

public class RoomList {
	@XmlElement(name="Rooms",type=Room.class)
	private static List<Room> Rooms = new ArrayList();

	public RoomList() {}

	public List<Room> getRooms() {
		return Rooms;
	}

	public void setRooms(List<Room> rooms) {
		Rooms = rooms;
	}
	
	public void addRooms(Room newRoom) {
		this.Rooms.add(newRoom);
	}
	
	public ObservableList<Room> accesRoomsAsObservable() {
		ObservableList<Room> result=FXCollections.observableArrayList();
		for(Room r:Rooms) {
			result.add(r);
		}
		return result;
	}
	
	public static void marshal(RoomList rl, File f) throws IOException, JAXBException {

		BufferedWriter writer = new BufferedWriter(new FileWriter(f));

		JAXBContext context = JAXBContext.newInstance(RoomList.class);

		Marshaller m = context.createMarshaller();
		m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
		m.setProperty(Marshaller.JAXB_ENCODING, "utf-8");
		m.marshal(rl, writer);
		writer.close();
	}
	
}
