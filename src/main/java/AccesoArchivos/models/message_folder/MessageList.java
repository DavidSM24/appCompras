package AccesoArchivos.models.message_folder;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name="MessageList")

public class MessageList implements Serializable{
	@XmlElement(name="Messages",type=Message.class)
	
	public static List<Message> Messages= new ArrayList();

	private static MessageList MiRepositorioM;
	
	private MessageList(List<Message> Messagges) {
		this.Messages=Messages;
	}
	
	public static MessageList getMiRepositorioM(List<Message> message) {
		if(MiRepositorioM==null) {
			MiRepositorioM=new MessageList(message);
		}
		return MiRepositorioM;
	}
	
	public MessageList() {}

	public List<Message> getMessages() {
		return Messages;
	}
	public void setMessages(List<Message> messages) {
		Messages = messages;
	}
	 
	public void addMessages(Message newMessage) {
		this.Messages.add(newMessage);
	}
	public static void getAllMessages(List<Message> m) {
		for (int i = 0; i < m.size(); i++) {
			
		}
	}
}
