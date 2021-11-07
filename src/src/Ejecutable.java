import java.io.File;
import java.io.FileFilter;
import java.io.IOException;

public class Ejecutable {
	public static void main(String[] args) {
        File f= new File("./");  //args[0]
        String ext = ".txt"; //args[1]
        
        String [] files=f.list();
        for(String file:files) {
        	File f2=new File(file);
        	if(f2.isFile() && file.endsWith(ext))
        		System.out.println(file);
            
        }
        
        FileFilter ff =new FileFilter() {
			
			@Override
			public boolean accept(File pathname) {
				// TODO Auto-generated method stub
				if(pathname.isFile() && pathname.getName().endsWith(ext))
					return true;
				
				return false;
			}
		};
        
        File[] fs= f.listFiles(ff);
        for(File f3 : fs) {
        	System.out.println(f3.getName());
        }
        
        File[] fs2 = f.listFiles(file-> !file.isDirectory() && 
        								file.getName().endsWith(ext));
        for(File f3 : fs) {
        	System.out.println(f3.getName());
        }
	}
}
