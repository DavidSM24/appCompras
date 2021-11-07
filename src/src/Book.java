import java.beans.Transient;
import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name="book")
public class Book implements Serializable{

	private static final long serialVersionUID = 1L;

	private String name;
	private String author;
	private String publisher;
	private String isbn;
	
	@XmlTransient
	private int afuego=6;  
	//propiedad que la excluyes de ser serializada
	
	public Book() {}

	public Book(String name, String author, String publisher, String isbn) {
		this.name = name;
		this.author = author;
		this.publisher = publisher;
		this.isbn = isbn;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}
	

	@Override
	public String toString() {
		return "Book [name=" + name + ", author=" + author + ", publisher=" + publisher + ", isbn=" + isbn + "]";
	}
	
	
	
	
}
