package AccesoArchivos.utils;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import AccesoArchivos.models.message_folder.Message;
import AccesoArchivos.models.message_folder.MessageList;
import AccesoArchivos.models.room_folder.Room;
import AccesoArchivos.models.room_folder.RoomList;

public class JAXBManagerRooms {
	public static void marshal(RoomList bl, String f) throws JAXBException {
		marshal(bl, "RoomsList.xml");
	}

	public static void mashal(RoomList rl, String roomList) throws JAXBException, IOException {
		marshal(rl, new File(roomList));
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

	public static Room unmarshal(File f) {
		JAXBContext jaxbC;
		try {
			jaxbC = JAXBContext.newInstance(MessageList.class);
			Unmarshaller um = jaxbC.createUnmarshaller();
			MessageList ml = (MessageList) um.unmarshal(new File("MessagesList.xml"));
//			for (Message i : ml.getMessages()) {
//				MessageList.Messages.add(i);
//			}
		} catch (JAXBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
