import java.io.File;

import javax.xml.bind.JAXBException;

public class EjecutableJAXB {
	public static void main(String[] args) {
		Book b=
			new Book("El Quijote","Cervantes","Desconocido","1");
		
		Book b2=
				new Book("El Señor de los Anillos",
						"J.R.R Tolkien","Desconocido","2");
		
		BookList lista=new BookList();
		lista.addBook(b);
		lista.addBook(b2);
		try {
			JAXBManager.marshal(lista, new File("ejemplo.xml"));
		} catch (JAXBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
