import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name="booklist")
public class BookList implements Serializable{

	private static final long serialVersionUID = 1L;
	@XmlElement(name="book",type=Book.class)
	private List<Book> books = new ArrayList<>();
	
	public BookList() {}

	public List<Book> getBooks() {
		return books;
	}

	public void setBooks(List<Book> books) {
		this.books = books;
	}
	
	public void addBook(Book newBook) {
		this.books.add(newBook);
	}
}
