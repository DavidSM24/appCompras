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


public class JAXBManagerMessages {
	public static void marshal(MessageList ml, String f)throws JAXBException{
		marshal(ml, "MessagesList.xml");
	}
	public static void mashal(MessageList ml,String MessageList) throws JAXBException,IOException{
		marshal(ml, new File(MessageList));
	}
	
public static void marshal(MessageList ml, File f) throws IOException, JAXBException {
		
		BufferedWriter writer = new BufferedWriter(new FileWriter(f));
		
		JAXBContext context= JAXBContext.newInstance(MessageList.class);
		
		Marshaller m= context.createMarshaller();
		m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
		m.setProperty(Marshaller.JAXB_ENCODING, "utf-8");
		m.marshal(ml, writer);
		writer.close();
	}


	public static void unmarshal(File f) {
		JAXBContext jaxbC;
		try {
			jaxbC=JAXBContext.newInstance(MessageList.class);
			Unmarshaller um = jaxbC.createUnmarshaller();
			MessageList r=(MessageList)um.unmarshal(new File("MessagesList.xml"));
			MessageList.Messages=r.Messages;
//			for(Message i:r.getAllMessages()){
//				
//			}
		} catch (JAXBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
