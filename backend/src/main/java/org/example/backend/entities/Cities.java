package org.example.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "destinations")
public class Cities {
    @Id
    private String id;
    private String name;
    private String country;
    private String subcountry;
    private Integer geonameid;
}
