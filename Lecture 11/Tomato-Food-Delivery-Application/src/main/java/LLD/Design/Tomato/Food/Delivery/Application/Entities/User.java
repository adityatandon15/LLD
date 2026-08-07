package LLD.Design.Tomato.Food.Delivery.Application.Entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private String UserId;
    private String UserName;
    private String UserAddress;
    private Cart cart = new Cart();
}
