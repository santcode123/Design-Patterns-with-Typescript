import { EngineeringStudentBuilder } from "./models/builders/EngineeringStudentBuilder";
import { ManagementStudentBuilder } from "./models/builders/ManagementStudentBuilder";

function demo() {
    // suppose we need to create a engineering and managment student obj

    const engineeringStudentBuilder = new EngineeringStudentBuilder({ rollNumber: 1, name: 'ABC' });
    engineeringStudentBuilder.setFatherName('Rohan');
    engineeringStudentBuilder.setAge(20);
    engineeringStudentBuilder.addSubjects();

    const managementStudentBuilder = new ManagementStudentBuilder({ rollNumber: 2, name: 'udit' });
    managementStudentBuilder.setAge(23);
    managementStudentBuilder.setAddress('Haridwar, Uttarakhand');
    managementStudentBuilder.setFatherName('Ajay');
    managementStudentBuilder.addSubjects();

    const obj1 = engineeringStudentBuilder.build();
    const obj2 = managementStudentBuilder.build();

    console.log('engineering student:', { obj1 });
    console.log('managment student:', { obj2 })
}

demo();