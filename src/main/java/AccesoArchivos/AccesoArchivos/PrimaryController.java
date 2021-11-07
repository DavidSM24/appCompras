package AccesoArchivos.AccesoArchivos;

import java.io.IOException;
import java.util.List;

import AccesoArchivos.models.user_folder.User;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.image.Image;
import javafx.stage.Modality;
import javafx.stage.Stage;
import javafx.stage.WindowEvent;

public class PrimaryController { //login
	
	@FXML
	protected Button btn_login;
	
	@FXML
	private void login() throws IOException {

		
		FXMLLoader loader = new FXMLLoader(getClass().getResource("room_selector.fxml"));
		Parent root = loader.load();
		Scene scene= new Scene(root);
		Room_Selector_Controller room_selector= loader.getController();
		room_selector.setController(new User(1,"prueba","",true));
		Stage stage2= new Stage();
		stage2.setScene(scene);
		Image image= new Image("file:src/main/resources/images/icons/icon_app.jpg");
		stage2.getIcons().add(image);
		stage2.setTitle("Chat XML");
		stage2.setResizable(false);;
		stage2.initModality(Modality.WINDOW_MODAL);
		
		Stage stage = (Stage) this.btn_login.getScene().getWindow();
		stage.close();
		
		stage2.show();
		
		
		stage2.setOnCloseRequest(new EventHandler<WindowEvent>() {
			@Override
			public void handle(WindowEvent e) {				
				
				try {			
					
					FXMLLoader loader = new FXMLLoader(getClass().getResource("primary.fxml"));
					Parent root;
					root = loader.load();
					Scene scene = new Scene(root);
					Stage stage2 = new Stage();
					stage2.setScene(scene);
					Image image = new Image("file:src/main/resources/images/icons/icon_app.jpg");
					stage2.getIcons().add(image);
					stage2.setTitle("Chat XML");
					stage2.setResizable(false);
					stage2.initModality(Modality.APPLICATION_MODAL);
					stage2.show();
					System.out.println("se ha cerrado el usuario");
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				
			}
		});
		stage2.show();
	}

}
