package dates;

import java.awt.Image;
import java.io.File;
import java.io.IOException;
import java.time.Instant;
import java.io.FileWriter;

public class Date{
    //fields
    File file;
    String name;
    String description;
    Image image;
    int avgPriceForOne;
    Swipe user;
    Swipe partner;

    //constructor
    public Date(){
        File file = setFile();
        this.file = file;
        this.name = setName(file);
        this.description = setDescription(file);
        this.image = setImage(file);
        this.avgPriceForOne = setAvgPriceForOne(file);
        this.user = Swipe.UNSEEN;
        this.partner = Swipe.UNSEEN;
    }

    
    private File setFile(){
        try {
            //to ensure unique filenames
            long time = Instant.now().getEpochSecond();
            String fileName = String.valueOf(time);
            fileName ="../data/" + fileName + ".txt";
            File file = new File(fileName);
            if (file.createNewFile()) {
              System.out.println("File created: " + file.getName());
            } else {
              System.out.println("File already exists.");
            }
          } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
          }
          return file;
    }


    private String setName(File file){
      String name = getName();
      try {
        FileWriter myWriter = new FileWriter(file, true);
        myWriter.write(name);
        myWriter.close();
      } catch (IOException e) {
        System.out.println("An error occurred.");
        e.printStackTrace();
      }
      return name;
    }


    private String getName(){
      return "temporary title string\n";
    }


    private String setDescription(File file){
      try {
        FileWriter myWriter = new FileWriter(file, true);
        String description = getDescription();
        myWriter.write(description);
        myWriter.close();
      } catch (IOException e) {
        System.out.println("An error occurred.");
        e.printStackTrace();
      }
      return description;
    }


    private String getDescription(){
      return "temporary description string\n";
    }

    
    private Image setImage(File file){
      return getImage();
    }


    private Image getImage(){
      //implement this  
    }

    private int setAvgPriceForOne(File file){
      int avgPrice = getAvgPriceForOne();
      try {
        FileWriter myWriter = new FileWriter(file, true);
        myWriter.write(avgPrice);
        myWriter.close();
      } catch (IOException e) {
        System.out.println("An error occurred.");
        e.printStackTrace();
      }
      return avgPrice;
    }

    private int getAvgPriceForOne(){
      return 100;
    }

    enum Swipe {
        UNSEEN,
        YES,
        NO
      }

}