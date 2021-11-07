module AccesoArchivos.AccesoArchivos {
    requires javafx.controls;
    requires javafx.fxml;
	requires java.xml.bind;
	requires javafx.base;

    opens AccesoArchivos.AccesoArchivos to javafx.fxml;
    exports AccesoArchivos.AccesoArchivos;
}
