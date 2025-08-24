import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActions from '../../components/ui/QuickActions';
import SessionStatus from '../../components/ui/SessionStatus';
import SearchBar from './components/SearchBar';
import SearchFilters from './components/SearchFilters';
import SearchResults from './components/SearchResults';
import MedicineDetails from './components/MedicineDetails';

const MedicineInformationDatabase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    drugType: 'all',
    prescriptionStatus: 'all',
    manufacturer: 'all'
  });

  // Mock medicine database
  const medicineDatabase = [
    {
      id: 1,
      name: "Paracetamol",
      genericName: "Acetaminophen",
      form: "Tablet",
      strength: "500mg",
      strengths: ["500mg", "650mg", "1000mg"],
      manufacturer: "GSK",
      prescriptionRequired: false,
      image: "https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg",
      primaryUses: ["Pain relief", "Fever reduction", "Headache"],
      detailedUses: [
        {
          condition: "Pain Relief",
          description: "Effective for mild to moderate pain including headaches, toothaches, and muscle aches.",
          effectiveness: 4
        },
        {
          condition: "Fever Reduction",
          description: "Reduces fever in adults and children by acting on the brain\'s temperature control center.",
          effectiveness: 5
        },
        {
          condition: "Post-operative Pain",
          description: "Often used as part of multimodal pain management after surgery.",
          effectiveness: 3
        }
      ],
      mechanism: "Paracetamol works by blocking the production of prostaglandins in the brain and spinal cord. Prostaglandins are chemicals that cause pain and inflammation. By reducing their production, paracetamol helps to relieve pain and reduce fever.",
      sideEffects: [
        {
          severity: "common",
          effects: ["Nausea", "Stomach upset", "Drowsiness"]
        },
        {
          severity: "uncommon",
          effects: ["Skin rash", "Allergic reactions", "Liver problems with overdose"]
        },
        {
          severity: "rare",
          effects: ["Severe allergic reactions", "Blood disorders", "Kidney problems"]
        }
      ],
      dosageInfo: [
        {
          ageGroup: "Adults (18+ years)",
          standardDose: "500-1000mg",
          frequency: "Every 4-6 hours as needed",
          instructions: [
            "Do not exceed 4000mg in 24 hours",
            "Take with or without food",
            "Swallow tablets whole with water"
          ]
        },
        {
          ageGroup: "Children (6-12 years)",
          standardDose: "250-500mg",
          frequency: "Every 4-6 hours as needed",
          instructions: [
            "Do not exceed 2400mg in 24 hours",
            "Use pediatric formulations when available",
            "Consult pediatrician for children under 6"
          ]
        }
      ],
      warnings: {
        contraindications: [
          "Severe liver disease",
          "Known allergy to paracetamol",
          "Chronic alcohol abuse"
        ],
        drugInteractions: [
          {
            drug: "Warfarin",
            effect: "May increase bleeding risk with regular use"
          },
          {
            drug: "Alcohol",
            effect: "Increased risk of liver damage"
          }
        ],
        precautions: [
          "Use with caution in liver or kidney disease",
          "Avoid alcohol while taking this medication",
          "Do not exceed recommended dose",
          "Consult doctor if symptoms persist beyond 3 days"
        ]
      }
    },
    {
      id: 2,
      name: "Ibuprofen",
      genericName: "Ibuprofen",
      form: "Tablet",
      strength: "400mg",
      strengths: ["200mg", "400mg", "600mg"],
      manufacturer: "Pfizer",
      prescriptionRequired: false,
      image: "https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg",
      primaryUses: ["Anti-inflammatory", "Pain relief", "Fever reduction"],
      detailedUses: [
        {
          condition: "Inflammation",
          description: "Reduces inflammation in conditions like arthritis, sprains, and strains.",
          effectiveness: 5
        },
        {
          condition: "Pain Relief",
          description: "Effective for moderate pain including dental pain, menstrual cramps, and muscle pain.",
          effectiveness: 4
        },
        {
          condition: "Fever",
          description: "Reduces fever and associated discomfort in adults and children.",
          effectiveness: 4
        }
      ],
      mechanism: "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) that works by blocking cyclooxygenase (COX) enzymes, which are responsible for producing prostaglandins that cause pain, inflammation, and fever.",
      sideEffects: [
        {
          severity: "common",
          effects: ["Stomach upset", "Heartburn", "Dizziness", "Headache"]
        },
        {
          severity: "uncommon",
          effects: ["Stomach ulcers", "High blood pressure", "Fluid retention"]
        },
        {
          severity: "rare",
          effects: ["Kidney problems", "Heart attack", "Stroke", "Severe allergic reactions"]
        }
      ],
      dosageInfo: [
        {
          ageGroup: "Adults (18+ years)",
          standardDose: "200-400mg",
          frequency: "Every 4-6 hours as needed",
          instructions: [
            "Do not exceed 1200mg in 24 hours without medical supervision",
            "Take with food to reduce stomach upset",
            "Swallow tablets whole with plenty of water"
          ]
        },
        {
          ageGroup: "Children (6+ months)",
          standardDose: "5-10mg per kg body weight",
          frequency: "Every 6-8 hours as needed",
          instructions: [
            "Use pediatric formulations",
            "Calculate dose based on weight, not age",
            "Consult pediatrician before use"
          ]
        }
      ],
      warnings: {
        contraindications: [
          "Active stomach ulcers",
          "Severe heart failure",
          "Severe kidney disease",
          "Allergy to NSAIDs or aspirin"
        ],
        drugInteractions: [
          {
            drug: "Blood thinners",
            effect: "Increased bleeding risk"
          },
          {
            drug: "ACE inhibitors",
            effect: "Reduced effectiveness of blood pressure medication"
          },
          {
            drug: "Lithium",
            effect: "Increased lithium levels in blood"
          }
        ],
        precautions: [
          "Use lowest effective dose for shortest duration",
          "Monitor blood pressure regularly",
          "Avoid in third trimester of pregnancy",
          "Use with caution in elderly patients"
        ]
      }
    },
    {
      id: 3,
      name: "Amoxicillin",
      genericName: "Amoxicillin",
      form: "Capsule",
      strength: "500mg",
      strengths: ["250mg", "500mg", "875mg"],
      manufacturer: "Abbott",
      prescriptionRequired: true,
      image: "https://images.pexels.com/photos/3683101/pexels-photo-3683101.jpeg",
      primaryUses: ["Bacterial infections", "Respiratory infections", "Urinary tract infections"],
      detailedUses: [
        {
          condition: "Respiratory Tract Infections",
          description: "Treats bacterial pneumonia, bronchitis, and sinusitis caused by susceptible organisms.",
          effectiveness: 5
        },
        {
          condition: "Urinary Tract Infections",
          description: "Effective against common UTI-causing bacteria like E. coli.",
          effectiveness: 4
        },
        {
          condition: "Skin and Soft Tissue Infections",
          description: "Treats cellulitis, wound infections, and other bacterial skin conditions.",
          effectiveness: 4
        }
      ],
      mechanism: "Amoxicillin is a penicillin antibiotic that works by interfering with bacterial cell wall synthesis, causing the bacteria to burst and die. It is effective against a wide range of gram-positive and some gram-negative bacteria.",
      sideEffects: [
        {
          severity: "common",
          effects: ["Nausea", "Diarrhea", "Stomach upset", "Headache"]
        },
        {
          severity: "uncommon",
          effects: ["Skin rash", "Vaginal yeast infection", "Dizziness"]
        },
        {
          severity: "rare",
          effects: ["Severe allergic reactions", "C. difficile colitis", "Liver problems"]
        }
      ],
      dosageInfo: [
        {
          ageGroup: "Adults (18+ years)",
          standardDose: "250-500mg",
          frequency: "Every 8 hours",
          instructions: [
            "Complete the full course even if feeling better",
            "Take with or without food",
            "Space doses evenly throughout the day"
          ]
        },
        {
          ageGroup: "Children",
          standardDose: "20-40mg per kg body weight",
          frequency: "Divided into 3 doses daily",
          instructions: [
            "Use pediatric suspension for young children",
            "Calculate dose based on weight",
            "Complete full prescribed course"
          ]
        }
      ],
      warnings: {
        contraindications: [
          "Allergy to penicillin or beta-lactam antibiotics",
          "History of severe allergic reactions to antibiotics",
          "Infectious mononucleosis"
        ],
        drugInteractions: [
          {
            drug: "Oral contraceptives",
            effect: "May reduce effectiveness of birth control pills"
          },
          {
            drug: "Methotrexate",
            effect: "Increased methotrexate toxicity"
          }
        ],
        precautions: [
          "Inform doctor of any allergies before starting",
          "Complete the full course of treatment",
          "May cause antibiotic-associated diarrhea",
          "Use additional contraception if taking birth control pills"
        ]
      }
    },
    {
      id: 4,
      name: "Metformin",
      genericName: "Metformin Hydrochloride",
      form: "Tablet",
      strength: "500mg",
      strengths: ["500mg", "850mg", "1000mg"],
      manufacturer: "Novartis",
      prescriptionRequired: true,
      image: "https://images.pexels.com/photos/3683095/pexels-photo-3683095.jpeg",
      primaryUses: ["Type 2 diabetes", "Blood sugar control", "PCOS"],
      detailedUses: [
        {
          condition: "Type 2 Diabetes Mellitus",
          description: "First-line treatment for type 2 diabetes, helps control blood glucose levels.",
          effectiveness: 5
        },
        {
          condition: "Polycystic Ovary Syndrome (PCOS)",
          description: "Helps improve insulin sensitivity and may assist with weight management in PCOS.",
          effectiveness: 4
        },
        {
          condition: "Prediabetes",
          description: "May help prevent progression to type 2 diabetes in high-risk individuals.",
          effectiveness: 3
        }
      ],
      mechanism: "Metformin works primarily by decreasing glucose production by the liver and improving insulin sensitivity in muscle and fat tissues. It also slows glucose absorption from the intestines.",
      sideEffects: [
        {
          severity: "common",
          effects: ["Nausea", "Diarrhea", "Stomach upset", "Metallic taste"]
        },
        {
          severity: "uncommon",
          effects: ["Vitamin B12 deficiency", "Weight loss", "Flatulence"]
        },
        {
          severity: "rare",
          effects: ["Lactic acidosis", "Severe allergic reactions"]
        }
      ],
      dosageInfo: [
        {
          ageGroup: "Adults (18+ years)",
          standardDose: "500mg",
          frequency: "1-2 times daily with meals",
          instructions: [
            "Start with low dose and gradually increase",
            "Take with meals to reduce stomach upset",
            "Swallow tablets whole, do not crush"
          ]
        }
      ],
      warnings: {
        contraindications: [
          "Severe kidney disease",
          "Acute heart failure",
          "Severe liver disease",
          "Diabetic ketoacidosis"
        ],
        drugInteractions: [
          {
            drug: "Contrast dyes",
            effect: "Increased risk of kidney problems"
          },
          {
            drug: "Alcohol",
            effect: "Increased risk of lactic acidosis"
          }
        ],
        precautions: [
          "Monitor kidney function regularly",
          "Stop before surgery or contrast procedures",
          "Limit alcohol consumption",
          "Monitor vitamin B12 levels with long-term use"
        ]
      }
    },
    {
      id: 5,
      name: "Aspirin",
      genericName: "Acetylsalicylic Acid",
      form: "Tablet",
      strength: "75mg",
      strengths: ["75mg", "100mg", "325mg"],
      manufacturer: "Bayer",
      prescriptionRequired: false,
      image: "https://images.pexels.com/photos/3683104/pexels-photo-3683104.jpeg",
      primaryUses: ["Heart protection", "Stroke prevention", "Pain relief"],
      detailedUses: [
        {
          condition: "Cardiovascular Protection",
          description: "Low-dose aspirin helps prevent heart attacks and strokes in high-risk patients.",
          effectiveness: 5
        },
        {
          condition: "Pain and Inflammation",
          description: "Higher doses effective for pain relief and reducing inflammation.",
          effectiveness: 4
        },
        {
          condition: "Fever Reduction",
          description: "Reduces fever, though not recommended for children due to Reye's syndrome risk.",
          effectiveness: 4
        }
      ],
      mechanism: "Aspirin works by irreversibly blocking cyclooxygenase enzymes, reducing prostaglandin production. This leads to decreased inflammation, pain, and fever. Low doses also inhibit platelet aggregation, reducing blood clot formation.",
      sideEffects: [
        {
          severity: "common",
          effects: ["Stomach irritation", "Heartburn", "Nausea"]
        },
        {
          severity: "uncommon",
          effects: ["Stomach ulcers", "Bleeding", "Allergic reactions"]
        },
        {
          severity: "rare",
          effects: ["Reye's syndrome (in children)", "Severe bleeding", "Kidney problems"]
        }
      ],
      dosageInfo: [
        {
          ageGroup: "Adults (Cardioprotective)",
          standardDose: "75-100mg",
          frequency: "Once daily",
          instructions: [
            "Take with food to reduce stomach irritation",
            "Use enteric-coated formulations if available",
            "Take at the same time each day"
          ]
        },
        {
          ageGroup: "Adults (Pain relief)",
          standardDose: "325-650mg",
          frequency: "Every 4 hours as needed",
          instructions: [
            "Do not exceed 4000mg in 24 hours",
            "Take with food or milk",
            "Do not use for more than 10 days without medical advice"
          ]
        }
      ],
      warnings: {
        contraindications: [
          "Active bleeding disorders",
          "Severe liver or kidney disease",
          "Allergy to salicylates",
          "Children under 16 (risk of Reye's syndrome)"
        ],
        drugInteractions: [
          {
            drug: "Warfarin",
            effect: "Significantly increased bleeding risk"
          },
          {
            drug: "Methotrexate",
            effect: "Increased methotrexate toxicity"
          }
        ],
        precautions: [
          "Monitor for signs of bleeding",
          "Use with caution in elderly patients",
          "Avoid in pregnancy, especially third trimester",
          "Stop before elective surgery"
        ]
      }
    },
    {
      id: 6,
      name: "Omeprazole",
      genericName: "Omeprazole",
      form: "Capsule",
      strength: "20mg",
      strengths: ["10mg", "20mg", "40mg"],
      manufacturer: "AstraZeneca",
      prescriptionRequired: false,
      image: "https://images.pexels.com/photos/3683099/pexels-photo-3683099.jpeg",
      primaryUses: ["Acid reflux", "Stomach ulcers", "GERD"],
      detailedUses: [
        {
          condition: "Gastroesophageal Reflux Disease (GERD)",
          description: "Reduces stomach acid production to treat heartburn and acid reflux symptoms.",
          effectiveness: 5
        },
        {
          condition: "Peptic Ulcers",
          description: "Helps heal stomach and duodenal ulcers by reducing acid production.",
          effectiveness: 5
        },
        {
          condition: "Zollinger-Ellison Syndrome",
          description: "Manages excessive acid production in this rare condition.",
          effectiveness: 4
        }
      ],
      mechanism: "Omeprazole is a proton pump inhibitor (PPI) that works by blocking the hydrogen-potassium ATPase enzyme system in gastric parietal cells, significantly reducing stomach acid production.",
      sideEffects: [
        {
          severity: "common",
          effects: ["Headache", "Nausea", "Diarrhea", "Stomach pain"]
        },
        {
          severity: "uncommon",
          effects: ["Dizziness", "Skin rash", "Flatulence", "Constipation"]
        },
        {
          severity: "rare",
          effects: ["Vitamin B12 deficiency", "Bone fractures", "Kidney problems", "C. difficile infection"]
        }
      ],
      dosageInfo: [
        {
          ageGroup: "Adults (18+ years)",
          standardDose: "20mg",
          frequency: "Once daily before breakfast",
          instructions: [
            "Swallow capsules whole, do not chew",
            "Take 30-60 minutes before eating",
            "Can be taken with or without food"
          ]
        }
      ],
      warnings: {
        contraindications: [
          "Allergy to omeprazole or other PPIs",
          "Concurrent use with rilpivirine"
        ],
        drugInteractions: [
          {
            drug: "Clopidogrel",
            effect: "May reduce effectiveness of clopidogrel"
          },
          {
            drug: "Warfarin",
            effect: "May increase warfarin levels"
          }
        ],
        precautions: [
          "Long-term use may increase fracture risk",
          "Monitor magnesium levels with prolonged use",
          "May mask symptoms of gastric cancer",
          "Gradual dose reduction recommended for discontinuation"
        ]
      }
    }
  ];

  // Filter medicines based on search term and filters
  const filterMedicines = (medicines, term, currentFilters) => {
    let filtered = medicines;

    // Text search
    if (term) {
      const searchLower = term?.toLowerCase();
      filtered = filtered?.filter(medicine =>
        medicine?.name?.toLowerCase()?.includes(searchLower) ||
        medicine?.genericName?.toLowerCase()?.includes(searchLower) ||
        medicine?.primaryUses?.some(use => use?.toLowerCase()?.includes(searchLower)) ||
        medicine?.manufacturer?.toLowerCase()?.includes(searchLower)
      );
    }

    // Apply filters
    if (currentFilters?.drugType !== 'all') {
      filtered = filtered?.filter(medicine =>
        medicine?.form?.toLowerCase()?.includes(currentFilters?.drugType)
      );
    }

    if (currentFilters?.prescriptionStatus !== 'all') {
      const requiresPrescription = currentFilters?.prescriptionStatus === 'prescription';
      filtered = filtered?.filter(medicine =>
        medicine?.prescriptionRequired === requiresPrescription
      );
    }

    if (currentFilters?.manufacturer !== 'all') {
      filtered = filtered?.filter(medicine =>
        medicine?.manufacturer?.toLowerCase()?.includes(currentFilters?.manufacturer?.toLowerCase())
      );
    }

    return filtered;
  };

  // Handle search
  const handleSearch = (term) => {
    setLoading(true);
    setSelectedMedicine(null);
    
    // Simulate API delay
    setTimeout(() => {
      const results = filterMedicines(medicineDatabase, term, filters);
      setSearchResults(results);
      setLoading(false);
    }, 800);
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  };

  // Handle medicine selection
  const handleMedicineSelect = (medicine) => {
    setSelectedMedicine(medicine);
  };

  // Handle back to search
  const handleBackToSearch = () => {
    setSelectedMedicine(null);
  };

  // Initial search effect
  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <Breadcrumb />
          
          {selectedMedicine ? (
            // Medicine Details View
            (<MedicineDetails
              medicine={selectedMedicine}
              onBack={handleBackToSearch}
            />)
          ) : (
            // Search View
            (<>
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Medicine Information Database
                </h1>
                <p className="text-text-secondary max-w-2xl">
                  Search our comprehensive database for detailed information about medicines, 
                  including uses, side effects, dosages, and important warnings.
                </p>
              </div>
              {/* Search Bar */}
              <div className="mb-6">
                <SearchBar
                  onSearch={handleSearch}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </div>
              {/* Search Filters */}
              <SearchFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                resultsCount={searchResults?.length}
              />
              {/* Search Results */}
              <SearchResults
                medicines={searchResults}
                loading={loading}
                searchTerm={searchTerm}
                onMedicineSelect={handleMedicineSelect}
                resultsCount={searchResults?.length}
              />
            </>)
          )}
        </div>
      </main>
      {/* Quick Actions */}
      <QuickActions />
      {/* Session Status */}
      <div className="fixed bottom-4 left-4 z-40">
        <SessionStatus
          isProcessing={loading}
          processingType="search"
          sessionTimeRemaining={45}
        />
      </div>
    </div>
  );
};

export default MedicineInformationDatabase;