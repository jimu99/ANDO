import pandas as pd

def get_top5_species(filepath):
    df = pd.read_csv(filepath, encoding='euc-kr')
    species_counts = df['종명'].value_counts().head(5)
    return species_counts.to_dict()

def get_living_type_distribution(filepath):
    df = pd.read_csv(filepath)
    total = df['count'].sum()
    df['percent'] = df['count'] / total * 100
    return {
        'labels': df['type'].tolist(),
        'values': df['percent'].tolist()
    }
